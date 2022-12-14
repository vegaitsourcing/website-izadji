import SharedComponents from '../enums/sharedComponents';
import GallerySlider from '../../components/GallerySlider/GallerySlider';
import TrendingArticles from '../../components/TrendingArticles/TrendingArticles';
import CollaboratorsSlider, {
  CollaboratorsSlideProps,
} from '../../components/CollaboratorsSlider/CollaboratorsSlider';
import { getWorkProgramSlider } from './workProgramMapper';
import Newsletter from '../../components/Newsletter/Newsletter';
import { GallerySlideProps } from '../../components/GallerySlide/GallerySlide';
import { TrendingArticleProps } from '../../components/TrendingArticle/TrendingArticle';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import RichTextComponent from '../../components/RichTextComponent/RichTextComponent';
import workProgramService from '../../services/workProgramService';
import DonateSection from '../../components/DonateSection/DonateSection';
import { getApiUrl } from '../urlHelpers';

const getGallerySlides = (imagesData: any): GallerySlideProps[] => {
  return imagesData.map((imageData: any) => {
    return {
      imageSrc: getApiUrl(imageData.attributes.url),
      largeImageSrc: getApiUrl(imageData.attributes.url),
      thumbnailImageSrc: getApiUrl(imageData.attributes.url),
      altText: imageData.attributes.alternativeText,
    };
  });
};

const getTrendingArticlesSlides = (
  trendingArticlesData: any
): TrendingArticleProps[] => {
  return trendingArticlesData.map((trendingArticle: any) => {
    const blogBanner = trendingArticle.attributes.blogBanner;
    const workProgramme =
      trendingArticle.attributes.work_program.data.attributes.banner.title;
    return {
      imageSrc: getApiUrl(blogBanner.image.data.attributes.url),
      date: blogBanner.date,
      title: blogBanner.title,
      category: workProgramme,
      link: `/blogs/${trendingArticle.id}`,
    };
  });
};

const getCollaboratorsSlides = (
  collaborators: any
): CollaboratorsSlideProps[] => {
  return collaborators.map((collaboratorData: any) => {
    return {
      imageSrc: getApiUrl(collaboratorData.attributes.url),
    };
  });
};

const SharedComponentsMapper: MappingFunction = async (component) => {
  switch (component['__component']) {
    case SharedComponents.GALLERY_SWIPER: {
      return (
        <GallerySlider
          key={`slider_${component.id}`}
          slides={getGallerySlides(component.imageSwiper.data)}
        />
      );
    }
    case SharedComponents.TRENDING_ARTICLES: {
      return (
        <TrendingArticles
          key={`trending_${component.id}`}
          slides={getTrendingArticlesSlides(component.blog_pages.data)}
          title="Aktuelnosti"
        />
      );
    }
    case SharedComponents.COLLABORATORS_SWIPER: {
      return (
        <CollaboratorsSlider
          key={`collaborators_${component.id}`}
          title={component.title}
          collaborators={getCollaboratorsSlides(component.logos.data)}
        />
      );
    }
    case SharedComponents.WORK_PROGRAM_SLIDER: {
      const workPrograms =
        await workProgramService.getWorkProgramPagesWithDeepPopulation();
      return getWorkProgramSlider(workPrograms.data.data, 'Program rada');
    }
    case SharedComponents.NEWSLETTER: {
      return (
        <Newsletter
          key={`newsletter_${component.id}`}
          title={component.text}
          buttonText={component.buttonText}
        />
      );
    }
    case SharedComponents.RICH_TEXT_EDITOR: {
      return (
        <RichTextComponent
          key={`rte_${component.id}`}
          content={component.content}
        />
      );
    }
    case SharedComponents.DONATE_SECTION: {
      return (
        <DonateSection
          key={`donate_section__${component.id}`}
          title={component.title}
          content={component.description}
          buttonHref={component.buttonHref}
          buttonText={component.buttonText}
        />
      );
    }
  }
};

export type MappingFunction = {
  (component: any): Promise<ReactNode | undefined> | ReactNode | undefined;
};

export type AdditionalComponents = {
  appendBefore?: ReactNode[];
  appendAfter?: ReactNode[];
};

export const MapComponents = (
  components: any[],
  customMappers: MappingFunction[],
  setComponents: Dispatch<SetStateAction<ReactNode[]>>,
  additionalComponents: AdditionalComponents = {}
) => {
  const allMappers = customMappers.concat(SharedComponentsMapper);
  Promise.all(
    components.map(async (component: any) => {
      for (const mapper of allMappers) {
        let mappingResult = mapper(component);
        if (mappingResult instanceof Promise<ReactNode | undefined>) {
          mappingResult = await mappingResult;
        }
        if (mappingResult) return mappingResult;
      }
      console.error('failed to map', component);
      return Promise.resolve(undefined);
    })
  ).then((components: ReactNode[]) => {
    const appendBefore = additionalComponents.appendBefore ?? [];
    const mappedComponents = components.filter((cmp) => !!cmp);
    const appendAfter = additionalComponents.appendAfter ?? [];

    setComponents(appendBefore.concat(mappedComponents, appendAfter));
  });
};
