export interface Book {
  id: string;
  uri: string;
  title?: string;
  author?: string;
}

export const books: Book[] = [
    {
        id: "1",
        uri: require("./zikora.jpg"),
        title: "Zikora",
        author: "",

    },
    {
        id: "2",
        uri: require("./nocturnes.jpg"),
        title: "Nocturnes",
        author: "Kazuo Ishiguro"
    },
    {
        id: "3",
        uri: require("./the_bell_jar.jpeg"),
        title: "The Bell Jar",
        author: "Sylvia Plath"
    },
    {
        id: "4",
        uri: require("./the_vet's_daughter.jpg"),
        title: "The Vet's Daughter",
        author: "Barbara Commyns"
    },
    {
        id: "5",
        uri: require("./where_the_crawdads_sing.jpg"),
        title: "Where the Crawdads Sing",
        author: "Delia Owens"
    },
        {
        id: "6",
        uri: require("./a_pale_view_of_hills.jpg"),
        title: "A Pale View of Hills",
        author: "Kazuo Ishiguro"
    },
    {
        id: "7",
        uri: require("./five_feet_apart.jpg"),
        title: "Five Feet Apart",
        author: "Rachael Lippincott"
    },
    {
        id: "8",
        uri: require("./the_buried_giant.jpg"),
        title: "The Buried Giant",
        author: "Kazuo Ishiguro"
    },
]