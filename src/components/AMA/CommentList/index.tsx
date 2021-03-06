import React from 'react';
import styled from 'styled-components/macro';
import CommentListItem from './Item';

const List = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

// eslint-disable-next-line react/no-array-index-key
const mapComments = (comments: any[]) =>
  comments.map((comment: any, index: any) => (
    // eslint-disable-next-line react/no-array-index-key
    <CommentListItem key={index} {...comment} />
  ));

const sortComments = (comments: any[]) =>
  comments.sort(
    (a: any, b: any) => +new Date(b.created) - +new Date(a.created)
  );

const CommentList = ({ comments }: any) =>
  comments && <List>{mapComments(sortComments(comments))}</List>;

export default CommentList;
