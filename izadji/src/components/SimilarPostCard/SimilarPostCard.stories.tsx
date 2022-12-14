import ProjectSlideImage1 from '../../assets/images/content/01.jpg';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SimilarPostCard from './SimilarPostCard';
import { MemoryRouter } from 'react-router';

export default {
  title: 'Similar Post Card',
  component: SimilarPostCard,
} as ComponentMeta<typeof SimilarPostCard>;

const Default: ComponentStory<typeof SimilarPostCard> = (args) => (
  <MemoryRouter>
    <SimilarPostCard {...args} />
  </MemoryRouter>
);

export const DefaultsimilarPostcard = Default.bind({});
DefaultsimilarPostcard.args = {
  imageSrc: ProjectSlideImage1,
  date: '29. novembar',
  title: 'Novi Projekat udruzenja Ime Projekta',
  category: 'Kategorija',
  link: 'link',
};
