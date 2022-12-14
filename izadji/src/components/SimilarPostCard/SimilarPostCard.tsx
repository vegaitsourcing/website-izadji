import { Link } from 'react-router-dom';
import styles from './SimilarPostCard.module.scss';

export type SimilarPostCardProps = {
  imageSrc: string;
  date: string;
  title: string;
  category: string;
  link: string;
};

const SimilarPostCard = ({
  imageSrc,
  date,
  title,
  category,
  link,
}: SimilarPostCardProps): JSX.Element => {
  return (
    <Link
      to={link}
      className={`${styles.feed__card} ${styles.feed__card__blog}`}
    >
      <div className={styles.feed__image__holder}>
        <div
          className={`${styles.feed__image} ${styles.has__cover}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      </div>
      <div className={styles.feed__text}>
        <h3 className={styles.feed__heading}>
          <span className={styles.feed__heading__text}>{title}</span>
        </h3>
        <span className={`${styles.feed__category} ${styles.category}`}>
          {category}
        </span>
        <div className={styles.feed__more}>
          <Link className={styles.feed__read__more} to={link}>
            Pročitaj više
          </Link>
          <span className={styles.feed__date}>
            {new Date(date).toLocaleDateString('sr-Latn-RS', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SimilarPostCard;
