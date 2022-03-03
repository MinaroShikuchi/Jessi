import { Client } from "@notionhq/client";

export class NotionService {
  // private notion: Client;
  static notion = new Client({
    auth: process.env.REACT_APP_NOTION_API_KEY,
    notionVersion: "2021-08-16",
  });
  /**
   * 1 - Close issues in Notion
   *
   * 2 - Update issues description/title in Notion
   */
  async updateNotionWithGitlab() {}

  static async getPosts(projectId: number) {
    console.log("Get all posts from Notion");
    const databaseId = "b8f41d55db164a4587dc7cd55adb8ea1";

    const response = await this.notion.databases.query({
      database_id: databaseId,
    });
    console.log(response.results.length);
    return response.results.map((post: any) => ({
      url: post.properties.URL.url.substring(28, post.properties.URL.url.length-1),
      model: post.properties.Model.select?.name || "",
    }));
    // console.log((response.results[0] as any).properties.Product);
    // return new Promise((resolve, reject) =>
    //   this.httpService
    //     .get<Issue[]>(`${this.url}/projects/${projectId}/issues`, {
    //       headers: {
    //         "PRIVATE-TOKEN": "",
    //       },
    //     })
    //     .subscribe((res) => {
    //       console.log(res.data.length);
    //       resolve(
    //         res.data.map((issue) => ({
    //           id: issue.id,
    //           name: issue.title,
    //           description: issue.description,
    //           status: issue.closed_at ? "completed" : null,
    //           ok: issue.closed_at ? true : false,
    //           tags: issue.labels,
    //           priority: issue.weight,
    //           issue: issue.web_url,
    //           due: issue.due_date,
    //         }))
    //       );
    //     })
    // );
  }
}
