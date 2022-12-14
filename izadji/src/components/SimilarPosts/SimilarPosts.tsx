import SimilarPostCard, {
  SimilarPostCardProps,
} from '../SimilarPostCard/SimilarPostCard';
import styles from './SimilarPosts.module.scss';
import { ReactNode } from 'react';

type SimilarPostsProps = {
  title: ReactNode;
  cards: SimilarPostCardProps[];
};
const SimilarPosts = ({ title, cards }: SimilarPostsProps): JSX.Element => {
  return (
    <section className={styles.box__blog__feed}>
      <div className={styles.wrap}>
        <div className={styles.box__blog__feed__container}>
          <div className={styles.box__blog__feed__content}>
            <h2
              className={`${styles.box__blog__feed__title} ${styles.section__title}`}
            >
              {title}
              <span className={styles.box__blog__feed__arrow}></span>
            </h2>
          </div>
          <div className={styles.box__blog__feed__holder}>
            {cards.map((item, key) => (
              <SimilarPostCard key={key} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SimilarPosts;
