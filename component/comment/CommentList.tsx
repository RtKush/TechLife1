// import {
//   useDeleteCommentMutation,
//   useGetCommentQuery,
// } from "@/features/comments/commentsApi";
// import React from "react";
// import { useAuth } from "@/hooks/userAuth";
// import CommentCard from "./CommentCard";

// type Comment = {
//   _id: string;
//   content: string;
//   authorId: {
//     userName: string;
//     _id: string;
//     avatar: string;
//   };
// };

// export default function CommentList({ blogId }: { blogId: string }) {
//   const { data, error, isLoading } = useGetCommentQuery(blogId);
//   const { userAuth } = useAuth();
//   const currentUserId = userAuth?.id;
//   const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching comments</p>;

//   const handleDelete = async (commentId: string) => {
//     try {
//       await deleteComment(commentId).unwrap();
//     } catch (error) {
//       console.error("Failed to delete comment", error);
//       return;
//     }
//   };

//   return (
//     <div className="space-y-4 mt-6">
//       {data.data?.map((comment: Comment) => (
//         //
//         <CommentCard
//           key={comment._id}
//           name={comment.authorId?.userName || comment.authorId?._id}
//           time="2022-11-13T20:00:00Z"
//           message={comment.content}
//           avatarUrl={comment.authorId?.avatar}
//           likes={12}
//           onDelete={() => handleDelete(comment._id)}
//           canDelete={currentUserId === comment.authorId?._id}
//         />
//       ))}
//     </div>
//   );
// }


"use client";

import {
  useDeleteCommentMutation,
  useGetCommentQuery,
} from "@/features/comments/commentsApi";
import React from "react";
import { useAuth } from "@/hooks/userAuth";
import CommentCard from "./CommentCard";

// ✅ Safe date formatter
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "Date not available";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

type Comment = {
  _id: string;
  content: string;
  createdAt?: string; // optional for safety
  authorId: {
    userName?: string;
    _id: string;
    avatar?: string;
  };
};

export default function CommentList({ blogId }: { blogId: string }) {
  const { data, error, isLoading } = useGetCommentQuery(blogId);
  const { userAuth } = useAuth();
  const currentUserId = userAuth?.id;
  const [deleteComment] = useDeleteCommentMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching comments</p>;

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {data?.data?.map((comment: Comment) => (
        <CommentCard
          key={comment._id}
          name={comment.authorId?.userName || comment.authorId?._id}
          time={formatDate(comment.createdAt)}
          message={comment.content}
          avatarUrl={comment.authorId?.avatar || ""}
          likes={12}
          onDelete={() => handleDelete(comment._id)}
          canDelete={currentUserId === comment.authorId?._id}
        />
      ))}
    </div>
  );
}
