import { siteConfig } from "@/config/site";
import { APIGuildMember, APIRole, APIUser } from "discord-api-types/v10";

export interface UserData {
  id: string;
  avatar: string;
  name: string;
  global_name: string | null;
  discriminator: string;
  role_color: number;
}

export default class Discord {
  private cache: Map<string, Partial<UserData>>;
  private constructor() {
    this.cache = new Map();
  }

  get(id: string) {
    return this.cache.get(id);
  }

  set(id: string, data: Partial<UserData>) {
    const cache = this.cache.get(id);
    const after = cache ? Object.assign(cache, data) : data;
    this.cache.set(id, after);
    return after;
  }

  static readonly cache = new Discord();
  static async fetch(id: string): Promise<UserData> {
    const cache = this.cache.get(id);
    if (this.isUserData(cache)) return cache;
    const userData = { id, ...(await this.getUserData(id)), ...(await this.getMemberData(id)) }
    this.cache.set(id, userData);
    return userData;
  }

  static getAvatarIndex({ id, discriminator }: Pick<UserData, 'id' | 'discriminator'>) {
    return discriminator === '0' ? Number(BigInt(id) >> 22n) % 6 : Number(discriminator) % 5;
  }

  private static isUserData(data?: Partial<UserData>): data is UserData {
    return Boolean(
      data?.avatar &&
      data.discriminator &&
      data.global_name &&
      data.name &&
      data.role_color
    );
  }

  private static async getUserData(id: string): Promise<Pick<UserData, 'avatar' | 'discriminator' | 'global_name' | 'name'>> {
    const user = await this.discordFetch<APIUser>(`users/${id}`);
    return {
      avatar: user.avatar ?
        `${this.cdn}/avatars/${user.id}/${user.avatar}.png` :
        `${this.cdn}/embed/avatars/${this.getAvatarIndex(user)}.png`,
      discriminator: user.discriminator,
      global_name: user.global_name,
      name: user.username
    }
  }

  private static async getMemberData(id: string): Promise<Pick<UserData, 'role_color'>> {
    const member = await this.discordFetch<APIGuildMember>(`guilds/${siteConfig.guildId}/members/${id}`);
    const roles = await this.discordFetch<APIRole[]>(`guilds/${siteConfig.guildId}/roles`);
    const hoistedRoles = roles.filter(v => member.roles?.includes(v.id) && v.hoist);
    const hoist = hoistedRoles.length ? hoistedRoles.reduce((prev, role) => {
      const pos1 = role.position;
      const pos2 = prev.position;
      return (pos1 === pos2 ? Number(BigInt(role.id) - BigInt(prev.id)) : pos1 - pos2) > 0 ? role : prev;
    }) : { color: 0xFFFFFF };
    return { role_color: hoist.color };
  }

  private static async discordFetch<T = any>(route: string): Promise<T> {
    return fetch(`${this.endpoint}/${route}`, {
      headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
      next: { revalidate: 2 * 60 * 60 }
    }).then(v => v.json<T>());
  }

  static readonly endpoint = 'https://discord.com/api/v10';
  static readonly cdn = 'https://cdn.discordapp.com';
}