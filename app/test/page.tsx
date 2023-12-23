import { basehub, ProjectsItemGenqlSelection } from "basehub";
// add limit

// export interface ProjectsItemGenqlSelection {
//   _id?: boolean | number;
//   _slug?: boolean | number;
//   _sys?: BlockDocumentSysGenqlSelection;
//   _title?: boolean | number;
//   author?: AuthorsItemGenqlSelection;
//   body?: BodyGenqlSelection;
//   category?: TagsItemGenqlSelection;
//   coverImage?: BlockImageGenqlSelection;
//   date?: boolean | number;
//   isPublished?: boolean | number;
//   route?: boolean | number;
//   subtitle?: boolean | number;
//   tags?: TagsGenqlSelection & {
//     __args?: {
//       /** Filter by a field. */
//       filter?: TagsItemFilterInput | null;
//       /** Limit the number of items returned. Defaults to 500. */
//       first?: Scalars["Int"] | null;
//       /** Order by a field. */
//       orderBy?: TagsItemOrderByEnum | null;
//       /** Skip the first n items. */
//       skip?: Scalars["Int"] | null;
//     };
//   };
//   __typename?: boolean | number;
//   __scalar?: boolean | number;
// }

const Page = async () => {
  const data = await basehub({ next: { revalidate: 30 } }).query({
    posts: {
      projects: {
        __args: {
          filter: {
            _sys_slug: {
              matches: { pattern: "ringruru" },
            },
            isPublished: true,
          },
        },
        _title: true,
        items: {
          _slug: true,
          _title: true,
          subtitle: true,
          route: true,
          coverImage: {
            rawUrl: true,
          },
          date: true,
          isPublished: true,
          tags: {
            items: {
              _title: true,
            },
          },
        },
      },
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Page;
