import React from 'react';
import { shallow } from 'enzyme';
import PostList from '../components/AMA/PostList/Component';
import PostListItem from '../components/AMA/PostList/Item';
import Empty from '../components/AMA/shared/Empty';
import LoadingIndicatorBox from '../components/AMA/shared/LoadingIndicator/Box';

it('renders without crashing', () => {
  shallow(<PostList fetchPosts={(fn: any) => fn} />);
});

it('renders a list of posts', () => {
  const posts = [{}, {}, {}];
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} posts={posts} />);
  expect(wrapper.children()).toHaveLength(posts.length);
  expect(wrapper.contains(<PostListItem />)).toEqual(true);
});

it('renders a loading indicator while fetching', () => {
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} isFetching />);
  expect(wrapper.contains(<LoadingIndicatorBox />)).toEqual(true);
});

it('renders a message when there are no posts', () => {
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} />);
  expect(wrapper.contains(<Empty />)).toEqual(true);
});
