import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes?.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );


  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    }

    savePost({ postId: post.$id, userId });
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="flex gap-2 mr-0 ml-1 mt-3">
        {isLikingPost?<Loader/>:<img
          src={
            checkIsLiked(likesList, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          height={20}
          width={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />}
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-0 ml-1 mt-3">
       {isDeletingPost||isSavingPost?<Loader/> :<img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          height={20}
          width={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />}
        <p className="small-medium lg:base-medium"></p>
      </div>
    </div>
  );
};

export default PostStats;
