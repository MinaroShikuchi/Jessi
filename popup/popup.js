// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

saveToNotion.addEventListener("click", async () => {
  console.log("Get all saved posts");
  let items = [];
  
});

saveToInstagram.addEventListener("click", async () => {
  console.log("Get all saved posts");
  let items = [];
  let next_max_id = "";
  let more_available = true;
  while (more_available) {
    res = await getMoreItems(next_max_id);
    next_max_id = res.next_max_id;
    more_available = res.more_available;
    items = [...items, ...res.items];
  }
  console.log(items);
});
// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

async function getMoreItems(next_max_id) {
  return new Promise((resolve, reject) => {
    console.log("getMoreItems");
    setTimeout(() => {
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
    }, 200);
  });
}

(async function () {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab.url.startsWith("https://www.instagram.com")) {
    saveToInstagram.style.backgroundColor = "pink";
  }
})();
