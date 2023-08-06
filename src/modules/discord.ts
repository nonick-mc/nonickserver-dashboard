import { siteConfig } from "@/config/site";
import userModel, { IUserSchema } from "@/schemas/userModel";
import { APIGuildMember, APIRole, APIUser } from "discord-api-types/v10";

export namespace Discord {
  export async function fetch(id: string): Promise<IUserSchema> {
    const doc = await userModel.findOne({ id });
    if (!doc) {
      const userData = await getUserData(id).catch(console.error);
      const memberData = await getMemberData(id).catch(console.error);
      return lean(await new userModel({ id, ...userData, ...memberData }).save({ wtimeout: 1500 }));
    }
    if (!doc.color) {
      const memberData = await getMemberData(id).catch(console.error);
      if (memberData) {
        doc.color = memberData.color ?? 0xFFFFFF;
      }
    }
    if (!(
      doc.avatar &&
      doc.discriminator &&
      doc.username
    )) {
      const userData = await getUserData(id).catch(console.error);
      if (userData) {
        doc.avatar = userData.avatar;
        doc.discriminator = userData.discriminator;
        doc.username = userData.username;
        doc.globalName = userData.globalName;
      }
    }
    return lean(await doc.save({ wtimeout: 1500 }));
  }

  function lean(doc: IUserSchema): IUserSchema {
    return {
      avatar: doc.avatar,
      discriminator: doc.discriminator,
      id: doc.id,
      username: doc.username,
      color: doc.color,
      globalName: doc.globalName,
    };
  }

  async function getUserData(id: string): Promise<Pick<IUserSchema, 'avatar' | 'discriminator' | 'globalName' | 'username'>> {
    const user = await _fetch<APIUser>(`users/${id}`);
    if ('message' in user) throw new TypeError(user.message);
    return {
      avatar: user.avatar ?
        `${cdn}/avatars/${id}/${user.avatar}.png` :
        `${cdn}/embed/avatars/${getAvatarIndex(user)}.png`,
      discriminator: user.discriminator,
      globalName: user.global_name ?? undefined,
      username: user.username,
    };
  }

  async function getMemberData(id: string): Promise<Pick<IUserSchema, 'color'>> {
    const member = await _fetch<APIGuildMember>(`guilds/${siteConfig.guildId}/members/${id}`);
    if ('message' in member) throw new TypeError(member.message);
    const roles = await _fetch<APIRole[]>(`guilds/${siteConfig.guildId}/roles`);
    if ('message' in roles) throw new TypeError(roles.message);
    const hoistedRoles = roles.filter(v => member.roles?.includes(v.id) && v.hoist);
    const hoist = hoistedRoles.length ? hoistedRoles.reduce((prev, role) => {
      const pos1 = role.position;
      const pos2 = prev.position;
      return (pos1 === pos2 ? Number(BigInt(role.id) - BigInt(prev.id)) : pos1 - pos2) > 0 ? role : prev;
    }) : { color: undefined };
    return { color: hoist.color };
  }

  export function getAvatarIndex({ id, discriminator }: { id: string, discriminator: string }) {
    return discriminator === '0' ? Number(BigInt(id) >> 22n) % 6 : Number(discriminator) % 5;
  }
}

const endpoint = 'https://discord.com/api/v10';
const cdn = 'https://cdn.discordapp.com';

async function _fetch<T = any>(route: string) {
  return fetch(`${endpoint}/${route}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 2 * 60 * 60 }
  }).then(v => {
    return v.json<T | { message: string }>();
  });
}