import React from 'react';
import { shallow } from 'enzyme';
import PostContent from '../components/AMA/Post/Content';
import PostContentTitle from '../components/AMA/Post/Content/Title';
import PostContentPreview from '../components/AMA/Post/Content/Preview';
import PostContentDetail from '../components/AMA/Post/Content/Detail';
import PostContentFullText from '../components/AMA/Post/Content/FullText';

it('renders without crashing', () => {
  shallow(<PostContent />);
});

it("renders the post's title, content preview, and details", () => {
  const wrapper = shallow(<PostContent type="link" />);
  expect(wrapper.find(PostContentTitle).exists()).toEqual(true);
  expect(wrapper.find(PostContentPreview).exists()).toEqual(true);
  expect(wrapper.contains(<PostContentDetail />)).toEqual(true);
});

it('renders the full text of a text post', () => {
  const text = 'example test post';
  const wrapper = shallow(<PostContent type="text" text={text} showFullPost />);
  expect(wrapper.find(PostContentFullText).exists()).toEqual(true);
  expect(wrapper.find(PostContentFullText).children().text()).toEqual(text);
});
