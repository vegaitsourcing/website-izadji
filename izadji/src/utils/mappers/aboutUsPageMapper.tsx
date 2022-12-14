import { EventProps } from '../../components/Event/Event';
import EventsSlider from '../../components/EventsSlider/EventsSlider';
import Team from '../../components/Team/Team';
import { TeamMemberItemProps } from '../../components/TeamMemberItem/TeamMemberItem';
import { convertDate, convertWeekDay } from '../dateTimeConversion';
import AboutUsPageComponents from '../enums/aboutUsPageComponents';
import { MappingFunction } from './sharedMapper';
import { getApiUrl } from '../urlHelpers';

const getOurTeamMembers = (teamMembers: any): TeamMemberItemProps[] => {
  return teamMembers.map((teamMember: any) => {
    return {
      name: teamMember.attributes.name,
      jobTitle: teamMember.attributes.jobTitle,
      bio: teamMember.attributes.biography,
      email: teamMember.attributes.emailField,
      profileImage: getApiUrl(
        teamMember.attributes.profileImage.data.attributes.url
      ),
    };
  });
};

const AboutUsPageMapper: MappingFunction = (component) => {
  switch (component['__component']) {
    case AboutUsPageComponents.OUR_TEAM: {
      return (
        <Team
          key={`our_team_${component.id}`}
          teamMembersList={getOurTeamMembers(component.team_members.data)}
          heading={component.team_members.title}
        />
      );
    }
  }
};

export default AboutUsPageMapper;
