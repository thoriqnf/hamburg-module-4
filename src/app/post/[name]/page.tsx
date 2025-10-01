import React from "react";

type PageProps = {
  params: { name: string };
  searchParams: any;
};

async function PostPage({ params, searchParams }: PageProps) {
  const { name } = await params;
  console.log("searchParams", searchParams);
  // const tab = (await (searchParams as string)) ?? "tes";
  // console.log("tab", tab);

  // const post = await getPost(name)
  return (
    <div>
      post id : {name}
      {/* - tab: {tab} */}
    </div>
  );
}

export default PostPage;
