import { wait } from '@/lib/utils';
import { APIUser } from 'discord-api-types/v10';

export interface UserData {
  avatar: string;
  discriminator: string;
  globalName?: string;
  username: string;
}
export async function getUserData(id: string): Promise<UserData> {
  const user = await _fetch<APIUser>(`users/${id}`);
  if ('message' in user) throw new TypeError(user.message);
  return {
    avatar: user.avatar
      ? `${cdn}/avatars/${id}/${user.avatar}.png`
      : `${cdn}/embed/avatars/${getAvatarIndex(user)}.png`,
    discriminator: user.discriminator,
    globalName: user.global_name ?? undefined,
    username: user.username,
  };
}

export function getAvatarIndex({
  id,
  discriminator,
}: { id: string; discriminator: string }) {
  return discriminator === '0'
    ? Number(BigInt(id) >> 22n) % 6
    : Number(discriminator) % 5;
}

const endpoint = 'https://discord.com/api/v10';
const cdn = 'https://cdn.discordapp.com';

async function _fetch<T = unknown>(
  route: string,
): Promise<T | { message: string }> {
  return fetch(`${endpoint}/${route}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 2 * 60 * 60 },
  }).then(async (v) => {
    if (v.status === 429) {
      const retryAfter = parseFloat(
        v.headers.get('x-ratelimit-reset-after') || '0',
      );
      await wait(retryAfter * 1000);
      return _fetch<T>(route);
    }
    return v.json<T | { message: string }>();
  });
}
