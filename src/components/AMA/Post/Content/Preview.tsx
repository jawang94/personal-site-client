import styled from 'styled-components/macro';
import { overflow } from '../../shared/helpers';

const PostContentPreview = styled.div`
  ${overflow};

  max-width: 800px;
  padding-bottom: 1px;
  font-size: 13px;
  line-height: 19px;
  color: ${(props) => props.theme.mutedText};

  @media only screen and (max-width: 768px) {
    max-width: 300px;
    text-align: left;
    word-break: break-word;
  }
`;

export default PostContentPreview;
