import Redis from "ioredis";

const redis = new Redis();
// 默认数据
const initialData: Record<string, string> = {
  "1": '{"title":"React 是什么？","content":"React是一个由Facebook开发的用于构建用户界面的JavaScript库。它可以帮助开发人员构建交互式的、动态的Web应用程序。React使用组件化的方法来构建UI，使得开发人员可以更轻松地管理和维护复杂的用户界面。","updateTime":"2024-05-22T09:19:48.837Z"}',
  "2": '{"title":"Next.js 是什么？","content":"Next.js是一个React框架，用于构建基于React的Web应用程序。它提供了许多功能，如服务器端渲染、静态生成、动态路由等，使得开发人员可以更轻松地构建现代的React应用程序。Next.js还提供了许多优化和工具，帮助开发人员提高开发效率和性能。","updateTime":"2024-05-22T09:19:48.837Z"}',
  "3": '{"title":"Redis是什么？","content":"Redis是一个开源的内存数据库，也被称为数据结构服务器。它支持多种数据结构，如字符串、哈希、列表、集合等，并提供高性能的读写操作。Redis通常用于缓存、会话存储、消息队列等场景，是一个快速、灵活且功能丰富的数据库解决方案。","updateTime":"2024-05-22T09:19:48.837Z"}',
};
/**
 * 获取所有笔记的 getAllNotes，这里我们做了一个特殊处理，如果为空，就插入 3 条事先定义的笔记数据
 * @returns 所有笔记
 */
export async function getAllNotes(): Promise<Record<string, string>> {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length === 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}
/**
 * 异步添加一个笔记。
 * @param data 要添加的笔记内容，类型为字符串。
 * @returns 返回一个字符串类型的UUID，代表新添加的笔记的唯一标识。
 */
export async function addNote(data: string): Promise<string> {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}
/**
 * 异步更新存储在Redis中的笔记数据。
 * @param uuid 笔记的唯一标识符，用于在Redis中定位笔记。
 * @param data 需要更新的笔记内容。
 * @returns Promise<void> 没有返回值的Promise。
 */
export async function updateNote(uuid: string, data: string): Promise<void> {
  // 使用Redis的hset命令更新指定uuid的笔记内容
  await redis.hset("notes", [uuid], data);
}

/**
 * 通过UUID异步获取笔记的详细信息。
 * @param uuid 笔记的唯一标识符。
 * @returns 返回一个Promise，该Promise解析为一个对象，包含笔记的标题、内容和更新时间。
 */
export async function getNote(
  uuid: string
): Promise<{ title: string; content: string; updateTime: string }> {
  // 从Redis中异步获取指定UUID的笔记数据
  const noteData = await redis.hget("notes", uuid);
  // 将获取的笔记数据从JSON格式解析为对象并返回
  return JSON.parse(noteData);
}

/**
 * 异步删除指定的笔记
 * @param uuid 笔记的唯一标识符，类型为字符串
 * @returns 返回一个Promise，该Promise解析为hdel命令返回的数量，表示删除的字段数量
 */
export async function delNote(uuid: string): Promise<number> {
  // 使用redis的hdel命令删除指定的笔记
  return redis.hdel("notes", uuid);
}

export default redis;
