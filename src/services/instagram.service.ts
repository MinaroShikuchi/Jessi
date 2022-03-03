import { Collection, PaginatedResponse, SavedPost } from "instagram";

export class InstagramService {
  static config = {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "x-asbd-id": "198387",
      "x-csrftoken": "DLnGwooKpTXSBp1LZciTxzQ9kIBBmG71",
      "x-ig-app-id": "936619743392459",
      "x-ig-www-claim": "hmac.AR0zGWtfWRYieQmG8I_LNgZXmoUc6HLvKlTIH7gfKwOXycvP",
      //   "hmac.AR0zGWtfWRYieQmG8I_LNgZXmoUc6HLvKlTIH7gfKwOXySDx",
      Referer: "https://www.instagram.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  };
  static async getSavedPosts() {
    let items: SavedPost[] = [];
    let next_max_id = "";
    let more_available = true;
    while (more_available) {
      const res = await this.fetchSavedPost(next_max_id);
      next_max_id = res.next_max_id;
      more_available = res.more_available;
      items = [...items, ...res.items];
    }
    return items;
  }
  static async fetchSavedPost(next_max_id: string) {
    console.log("getSavedPost");
    return new Promise<PaginatedResponse<SavedPost>>((resolve, reject) => {
      fetch(
        `https://i.instagram.com/api/v1/feed/saved/posts/?max_id=${next_max_id}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1",
            "x-asbd-id": "198387",
            "x-ig-app-id": "936619743392459",
            "x-ig-www-claim":
              "hmac.AR0zGWtfWRYieQmG8I_LNgZXmoUc6HLvKlTIH7gfKwOXycvP",
            cookie:
              'mid=YgQ7ugAEAAH8AJyps0NSEJsmWaZ0; ig_did=587E69E1-BF27-4E83-A653-AA5436ACFE4C; csrftoken=DLnGwooKpTXSBp1LZciTxzQ9kIBBmG71; ds_user_id=2098374939; sessionid=2098374939%3A48T1KTjumUbleB%3A26; fbm_124024574287414=base_domain=.instagram.com; shbid="7897\\0542098374939\\0541677501036:01f7d05d7d88bc2b11c1d79f608c02710c356c2dba798fbfd53a040640db8e5b545d2cf8"; shbts="1645965036\\0542098374939\\0541677501036:01f757eeba0d585b0e746ab92194cd3943fce5afc9b2d2588b85102c6730f4072d357763"; datr=sHcbYkLgocvjNod0YRyWONA3; fbsr_124024574287414=KMEoHCzJAffkrdoZZMk38K1cho0ZKSTu-rsu09-X68s.eyJ1c2VyX2lkIjoiNzI0NjAzNjg2IiwiY29kZSI6IkFRREZhM2NQTlBsYUF4dV9zSklOTnhfbnExVGx4V1VYQTB4WVB5V25sdnExYklpcHctUmxUUFljRUhGekNNblQxeEhBakZ3SDJtZ21abXQzTWh5QUliRVlCMFhYLVBwMmg3M1k0TWxpQnNHc1dfV2tORFZLWGhVbmVnUXAtdjVQdWlYNWUzcUFMYkloNVNXQ3N3c0ZuRWg2eXY2Mkc4T2FnbW4xN1hyclVGSDZGRHpJM1BkaUtVR0piaW9mUHVvY3U0X2c3amszV2traHM5a0lhc2xFWmNWTHJ6TV9MbnhZanU3Zzg0N3lfTG9IMTFJOVZ5WUY5ZEkxdFZfTEZtdmdOWWlNNGowNzAzTm9ycXFkcDNHa0tQdXAtbzRDV3ZQR2NyTEJRYzg4RnlRZDZkOWdLQUpMeE1oQlpCODc0dmRWUHNCczlsMngxekJwZWZIZWxTS1VVWHhQTDdsQjYySDYyWTVyZUFEdm5oZ3FnQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFOdFA3UmhaQ3VSaXdaQmpWbDhWVjNMOTBEc3BaQXN0cUlzdEp2YU96c2wwWXRyeE9uSmpsZTl5RVdZNmZUY0l0b0M2Q1pDM3ZWRFI2eHBPeEk3MzBUb0t6cVI3V0oxNU1hdWRHd0JJUmZZcW9menVTSXJrWkJuS1BaQ1pCYlpCUWxGTXdybWNJVkNOWkJaQW5MWkI3dlZmSllyOWJaQ3JOQVF2c0JKdzRJRDczUWc5IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2NDU5ODI2ODl9; rur="FRC\\0542098374939\\0541677518695:01f7fff9ca32315f459ed6120f80261baa317f717bd8e329110804a113a8defc3ff33e6b"',
            Referer: "https://www.instagram.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: null,
          method: "GET",
        }
      )
        .then(async (r) => await r.json())
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }
  static async getCollections() {
    console.log("Get all collections from Instagram");
    let collections: Collection[] = [];
    let next_max_id = "";
    let more_available = true;
    while (more_available) {
      const res = await this.fetchCollection(next_max_id);
      next_max_id = res.next_max_id;
      more_available = res.more_available;
      collections = [...collections, ...res.items];
    }
    return collections;
  }
  static async fetchCollection(next_max_id: string) {
    console.log("fetchCollection");
    return new Promise<PaginatedResponse<Collection>>((resolve, reject) => {
      fetch(
        `https://i.instagram.com/api/v1/collections/list/?collection_types=%5B%22ALL_MEDIA_AUTO_COLLECTION%22%2C%22MEDIA%22%5D&include_public_only=0&get_cover_media_lists=true&max_id=${next_max_id}`,
        {
          headers: this.config.headers,
          referrer: "https://www.instagram.com/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      )
        .then(async (r) => await r.json())
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }
  static async createCollection(name: string) {
    return new Promise((resolve, reject) => {
      fetch("https://i.instagram.com/api/v1/collections/create/", {
        headers: {
          ...this.config.headers,
          "content-type": "application/x-www-form-urlencoded",
          "x-instagram-ajax": "238ee7baa9c1",
          cookie:
            'mid=YgQ7ugAEAAH8AJyps0NSEJsmWaZ0; ig_did=587E69E1-BF27-4E83-A653-AA5436ACFE4C; csrftoken=DLnGwooKpTXSBp1LZciTxzQ9kIBBmG71; ds_user_id=2098374939; sessionid=2098374939%3A48T1KTjumUbleB%3A26; fbm_124024574287414=base_domain=.instagram.com; shbid="7897\\0542098374939\\0541677501036:01f7d05d7d88bc2b11c1d79f608c02710c356c2dba798fbfd53a040640db8e5b545d2cf8"; shbts="1645965036\\0542098374939\\0541677501036:01f757eeba0d585b0e746ab92194cd3943fce5afc9b2d2588b85102c6730f4072d357763"; datr=sHcbYkLgocvjNod0YRyWONA3; fbsr_124024574287414=HyCP_I-v2mDRfROJnEr3e7lLkOgDZOF-nSl6oLUbMlw.eyJ1c2VyX2lkIjoiNzI0NjAzNjg2IiwiY29kZSI6IkFRQkkzRUJ3eDBTWDlJTHpvLVM3ejZYUUtaajZkRElwWFZXOUFZbkZ2R1ZacnNxbDRuN3RLYzl3QmQ4X1dJM0FxME5lNlltQVlDS1pFZzhMSUhta0Z6a251R3F5UUpZWWI1TWdHWlFjdHFzUll4SnJtNnRzbG5vZTZwSDFtR252bld0NDh6TFdqa3V6Q2pROC1OWFVkSGl1c1lSbXg2NUNRQmJyZUE3dS1aa0dSM3FkdHBiTkZBakNzU0w0WDZoS19TdmYyT2FLODJQUG1OQ24zWlpoTzJsRlN1WUdoRWFxRmJ6SzBrTHRXcmp1VkI1NmlmWWNMcTRocE9lTFFnY1UybzdxN0pIalpqczNLVjhhQkVVeGI2OE9LQTk2WGpGdjROdmVIZjNMZ3pEMVFZLWh6VVNxZ2MtQVJFR09vOHZ5SGV6UmR4ZkFkY2lyYjU0Y0pOVWRxeEpXamM1TWo0Mjk5a2djVDUzdU1IYjZ4QSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFKYzFrYk1oZGd1QUh4Z0ptSGhoM1pDd2VRNGtYa0szYUhBQlIwNk1KOTh3RUtrMk5aQ0JGWTk4Nmo3UzRiQlV5VHJZWkFmS2w0RXlNcVNMTmVIVldaQ2xUUWhjUURIQnhnV2lJQTN2Z3VwWkNqaXJ6UXNubFhhYnhRb2g4ZU1ndVY4d1RaQlZoUHJaQTVmakszd3JUdlpCVzk4YTBPZFRFWFpDYUUxMm14ZGRLIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2NDU5NjgwMjd9; rur="ASH\\0542098374939\\0541677504147:01f7a179325c27c837c88381bf93177da797fdb1c345f0b4f6afe71bf83ce6fa95d2b950"',
        },
        body: `name=${name}`,
        method: "POST",
      })
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }

  static async addToCollection(collection_id: string, media_id: string) {
    console.log(`Will add media ${media_id} to collection ${collection_id}`);

    const body = new URLSearchParams();
    body.append("added_media_ids", JSON.stringify([media_id]));
    // body.append("added_media_ids", '');
    // body.append("added_media_ids", '');
    // body.append("added_media_ids", );
    return new Promise((resolve, reject) => {
      fetch(
        `https://i.instagram.com/api/v1/collections/${collection_id}/edit/`,
        {
          headers: {
            ...this.config.headers,
            "content-type": "application/x-www-form-urlencoded",
            "x-instagram-ajax": "c14f5c1119e5",
          },
          body,
          method: "POST",
          //   mode: "cors",
          //   credentials: "include",
        }
      )
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }

  static async findMediaId(url: string) {
    return new Promise<any>((resolve, reject) => {
      fetch(`https://www.instagram.com/p/${url}/?__a=1`, {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then(async (res) => await res.json())
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  }
}
