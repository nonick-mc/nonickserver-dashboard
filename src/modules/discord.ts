import { siteConfig } from "@/config/site";
import { APIGuildMember, APIRole, APIUser } from "discord-api-types/v10";

export const endpoint = 'https://discord.com/api/v10';
export const cdn = 'https://cdn.discordapp.com';

export function getAvatarIndex(user: APIUser) {
  return user.discriminator === '0' ?
    Number(BigInt(user.id) >> 22n) % 6 :
    Number(user.discriminator) % 5
}

export function getUser(id: string) {
  return fetch(`${endpoint}/users/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 2 * 60 * 60 },
  }).then(async (res) => {
    return await res.json<APIUser>()
  });
}

export async function getMember(id: string) {
  return fetch(`${endpoint}/guilds/${siteConfig.guildId}/members/${id}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 5 * 60 },
  }).then(async (res) => {
    return await res.json<APIGuildMember>()
  });
}

async function getRoles() {
  return fetch(`${endpoint}/guilds/${siteConfig.guildId}/roles`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 5 * 60 },
  }).then(async (res) => {
    return await res.json<APIRole[]>()
  });
}

function roleComparePositions(role1: APIRole, role2: APIRole) {
  const pos1 = role1.position;
  const pos2 = role2.position;

  if (pos1 === pos2) {
    return Number(BigInt(role2.id) - BigInt(role1.id));
  }

  return pos1 - pos2;
}

export async function getMemberHoistRole(member: APIGuildMember) {
  const roles = await getRoles();
  const hoistRoles = roles.filter(v => member.roles.includes(v.id) && v.hoist);
  if (!hoistRoles.length) return null;
  return hoistRoles.reduce((prev, role) => roleComparePositions(role, prev) > 0 ? role : prev);
}


export function getDisplayMemberAvatar(member: APIGuildMember) {
  if (!member.user) return null;
  return (
    `${cdn}/guilds/${siteConfig.guildId}/users/${member.user.id}/avatars/${member.avatar}.png` ??
    getDisplayUserAvatar(member.user)
  );
}

export function getDisplayUserAvatar(user: APIUser) {
  return (
    (user.avatar && `${cdn}/avatars/${user.id}/${user.avatar}.png`) ??
    `${cdn}/embed/avatars/${getAvatarIndex(user)}.png`
  );
}