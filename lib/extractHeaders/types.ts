export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type DotNavItem = {
  label: string; // label name as a string
  id: string; // used to navigate to header
  offsetTop?: number;
  subitems?: DotNavItem[]; // array of subitems, each of type DotNavItem
};

export interface StackItem {
  level: number;
  header: DotNavItem;
  position: number;
}

export type TeamMember = {
  id: number;
  dateJoined: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  profilePicture: string;
  image: string;
  UID: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 0,
    dateJoined: "2021-09-01",
    firstName: "Marcus",
    lastName: "Lim",
    title: "Founder",
    description:
      "I want to tell a story unheard, with words so inspiring, the very gravity of their pull slows time.",
    profilePicture: "/profiles/PFP-000.png",
    image: "/profiles/illustration/663riv-002.png",
    UID: "M-000",
  },
  {
    id: 1,
    dateJoined: "2023-02-15",
    firstName: "Emily",
    lastName: "Wong",
    title: "Chief Creative Officer",
    description:
      "Creativity knows no bounds; it's a canvas where imagination paints the world's possibilities.",
    profilePicture: "/profiles/PFP-001.jpg",
    image: "/profiles/illustration/663riv-001.png",
    UID: "Emily-001",
  },
  {
    id: 2,
    dateJoined: "2022-11-10",
    firstName: "Alex",
    lastName: "Chen",
    title: "Lead Engineer",
    description:
      "Engineering is the art of turning dreams into reality, one line of code at a time.",
    profilePicture: "/profiles/PFP-002.jpg",
    image: "/profiles/illustration/663riv-003.png",
    UID: "Alex-002",
  },
  {
    id: 3,
    dateJoined: "2022-06-20",
    firstName: "Sophia",
    lastName: "Lee",
    title: "Model",
    description:
      "As a model, I embody the essence of art and beauty, using my form to tell stories beyond words.",
    profilePicture: "/profiles/PFP-003.jpg",
    image: "/profiles/illustration/663riv-004.png",
    UID: "Sophia-003",
  },
  {
    id: 4,
    dateJoined: "2023-01-05",
    firstName: "Oliver",
    lastName: "Smith",
    title: "Creative Director",
    description:
      "In the world of creativity, I orchestrate ideas into a symphony of visual and emotional experiences.",
    profilePicture: "/profiles/PFP-004.jpg",
    image: "/profiles/illustration/663riv-005.png",
    UID: "Oliver-004",
  },
  {
    id: 5,
    dateJoined: "2023-06-10",
    firstName: "Megan",
    lastName: "Johnson",
    title: "Media Manager",
    description:
      "Media is the tapestry that weaves stories into the fabric of society, and I'm here to ensure its resonance.",
    profilePicture: "/profiles/PFP-005.jpg",
    image: "/profiles/illustration/mettaflix-001.png",
    UID: "Megan-005",
  },
  {
    id: 6,
    dateJoined: "2022-09-18",
    firstName: "Nathan",
    lastName: "Davis",
    title: "3D Sculptor",
    description:
      "With pixels as my clay and imagination as my chisel, I sculpt virtual worlds that transcend reality.",
    profilePicture: "/profiles/PFP-006.jpg",
    image: "/profiles/illustration/mettaflix-002.png",
    UID: "Nathan-006",
  },
  {
    id: 7,
    dateJoined: "2023-09-01",
    firstName: "Isabella",
    lastName: "Liu",
    title: "UX Designer",
    description:
      "I shape digital experiences that fuse beauty with functionality, making technology a joy to interact with.",
    profilePicture: "/profiles/PFP-007.jpg",
    image: "/profiles/illustration/mettaflix-003.png",
    UID: "Isabella-007",
  },
  {
    id: 8,
    dateJoined: "2023-08-10",
    firstName: "William",
    lastName: "Garcia",
    title: "Content Writer",
    description:
      "Words have the power to shape perceptions and ignite minds; I wield them to craft compelling narratives.",
    profilePicture: "/profiles/PFP-008.jpg",
    image: "/profiles/illustration/mettaflix-004.png",
    UID: "William-008",
  },
  {
    id: 9,
    dateJoined: "2022-04-25",
    firstName: "Ava",
    lastName: "Martinez",
    title: "Marketing Strategist",
    description:
      "Guiding our brand's journey through the labyrinth of trends and markets, I make waves in the business world.",
    profilePicture: "/profiles/PFP-009.jpg",
    image: "/profiles/illustration/mettaflix-005.png",
    UID: "Ava-009",
  },
  {
    id: 10,
    dateJoined: "2023-03-15",
    firstName: "Ethan",
    lastName: "Wilson",
    title: "Animator",
    description:
      "Motion breathes life into art, and I breathe magic into still images, giving them a heartbeat of their own.",
    profilePicture: "/profiles/PFP-010.jpg",
    image: "/profiles/illustration/mettaflix-006.png",
    UID: "Ethan-010",
  },
  {
    id: 11,
    dateJoined: "2022-12-03",
    firstName: "Lily",
    lastName: "Nguyen",
    title: "UI Designer",
    description:
      "Designing interfaces that blend aesthetics with usability, I create digital landscapes where users find joy.",
    profilePicture: "/profiles/PFP-011.jpg",
    image: "/profiles/illustration/663riv-005.png",
    UID: "Lily-011",
  },
  {
    id: 12,
    dateJoined: "2023-05-20",
    firstName: "Jackson",
    lastName: "Brown",
    title: "Video Producer",
    description:
      "Behind the lens, I capture moments that tell stories, stitching frames into tales that move hearts.",
    profilePicture: "/profiles/PFP-012.jpg",
    image: "/profiles/illustration/663riv-003.png",
    UID: "Jackson-012",
  },
  {
    id: 13,
    dateJoined: "2022-10-08",
    firstName: "Grace",
    lastName: "Rodriguez",
    title: "Public Relations",
    description:
      "I orchestrate the harmony between our brand and the world, crafting relationships that resonate.",
    profilePicture: "/profiles/PFP-013.jpg",
    image: "/profiles/illustration/663riv-001.png",
    UID: "Grace-013",
  },
  {
    id: 14,
    dateJoined: "2023-07-12",
    firstName: "Noah",
    lastName: "Martins",
    title: "Sound Designer",
    description:
      "Soundscapes enrich our experiences, and I sculpt audio that immerses, awakens, and lingers.",
    profilePicture: "/profiles/PFP-014.jpg",
    image: "/profiles/illustration/mettaflix-001.png",
    UID: "Noah-014",
  },
  {
    id: 15,
    dateJoined: "2022-08-05",
    firstName: "Sofia",
    lastName: "Gupta",
    title: "Project Manager",
    description:
      "In the dance of creativity, I'm the choreographer who ensures every step leads to a flawless performance.",
    profilePicture: "/profiles/PFP-015.jpg",
    image: "/profiles/illustration/mettaflix-006.png",
    UID: "Sofia-015",
  },
];
