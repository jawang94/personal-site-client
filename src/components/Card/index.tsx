import * as React from 'react';
import { memo, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import useInvertedBorderRadius from '../../utils/use-inverted-border-radius';
import { CardData } from '../types';
import ContentPlaceholder from './ContentPlaceholder';
import Title from './Title';
import Image from './Image';
import { openSpring, closeSpring } from './animations';
import useScrollConstraints from '../../utils/use-scroll-constraints';
import useWheelScroll from '../../utils/use-wheel-scroll';
import cardContent from '../../utils/cardContent';

const Overlay = ({ isSelected }: any) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 0.25 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    className="overlay"
  >
    <Link to="/projects/" />
  </motion.div>
);

interface Props extends CardData {
  isSelected: boolean;
  history: {
    push: (route: string) => void;
  };
}

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;

const Card = memo(
  ({
    isSelected,
    id,
    title,
    category,
    history,
    pointOfInterest,
    backgroundColor,
    link,
  }: Props) => {
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      y.get() > dismissDistance && history.push('/projects/');
    }

    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );

    return (
      <li ref={containerRef} className="card">
        <Overlay isSelected={isSelected} />
        <div className={`card-content-container ${isSelected && 'open'}`}>
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
            />
            <Title
              title={title}
              category={category}
              link={link}
              isSelected={isSelected}
            />
            <ContentPlaceholder content={cardContent[id]} />
          </motion.div>
        </div>
        {!isSelected && (
          <Link to={`/projects/${id}`} className="card-open-link" />
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Card;
