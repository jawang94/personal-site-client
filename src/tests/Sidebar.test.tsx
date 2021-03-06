import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../components/AMA/Sidebar/Component';
import SidebarCategoryList from '../components/AMA/Sidebar/CategoryList';
import SidebarCreatePostButton from '../components/AMA/Sidebar/CreatePostButton';

it('renders without crashing', () => {
  shallow(<Sidebar />);
});

it('renders a list of categories', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.contains(<SidebarCategoryList />)).toEqual(true);
});

it('renders a create post button if user is logged in', () => {
  const wrapper = shallow(<Sidebar token />);
  expect(wrapper.contains(<SidebarCreatePostButton />)).toEqual(true);
});

it("doesn't render a create post button if user is not logged in", () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.contains(<SidebarCreatePostButton />)).toEqual(false);
});
