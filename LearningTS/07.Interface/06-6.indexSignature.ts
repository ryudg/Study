// 7.Interface/06-6.indexSignature.ts
interface Setting {
  place: string;
  year: number;
}

interface Novel {
  author: {
    name: string;
  };

  setting: Setting;
}

let myNovel: Novel;

myNovel = {
  author: {
    name: "Jane Austen",
  },
  setting: {
    place: "England",
    year: 1815,
  },
};

myNovel = {
  author: {
    name: "Charlotte Brontë",
  },
  setting: {
    //^^^^^^^ Property 'year' is missing in type '{ place: string; }' but required in type 'Setting'.
    place: "England",
  },
};
