import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Group, Stack } from '@mantine/core';
import { ImportantPerson } from '../entities/public/ui/ImportantPerson';
import { OrganizerInfo } from '../entities/public/ui/OrganizerInfo';
import { AddressMap } from '../features/public/ui/AddressMap';
import { ApplyForm } from '../features/public/ui/ApplyForm';
import { CountdownTimer } from '../features/public/ui/CountdownTimer';
import { FullscreenBackground } from '../shared/ui/FullscreenBackground';
import { Footer } from '../widgets/public/Footer';
import { HeadingBlock } from '../widgets/public/HeadingBlock';

export function HomePage() {
  const { t } = useTranslation(['events', 'navigation']);

  // Example/mock data
  const eventTitle = t('events:home.title');
  const eventSubtitle = t('events:home.subtitle');
  const eventDate = new Date('2025-09-15T10:00:00+05:00');
  const eventAddress = t('events:home.location.address');
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.123456789!2d71.401234!3d51.090123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585d123456789%3A0xabcdefabcdefabcd!2sAstana%20International%20Expo%20Center!5e0!3m2!1sen!2skz!4v1687000000000!5m2!1sen!2skz';
  const keynote = {
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: t('events:home.keynote.name'),
    title: t('events:home.keynote.title'),
    bio: t('events:home.keynote.bio'),
  };
  const organizer = {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Expo_2017_Astana_logo.svg',
    name: t('events:home.organizer.name'),
    description: t('events:home.organizer.description'),
    website: t('events:home.organizer.website'),
    socials: [
      { label: t('events:home.socials.instagram'), url: 'https://instagram.com/astanaevents' },
      {
        label: t('events:home.socials.linkedin'),
        url: 'https://linkedin.com/company/astanaevents',
      },
    ],
  };
  const footerLinks = [
    { label: t('navigation:footer.links.privacyPolicy'), href: '/privacy' },
    { label: t('navigation:footer.links.termsOfService'), href: '/terms' },
    { label: t('navigation:footer.links.contact'), href: '/contact' },
  ];

  return (
    <FullscreenBackground>
      <Container size="lg" px="md" py="xl">
        <Stack gap="xl">
          <Box>
            <HeadingBlock
              title={eventTitle}
              subtitle={eventSubtitle}
              ctaLabel={t('common:buttons.applyNow')}
              ctaHref="#apply"
            />
          </Box>
          <Group justify="center">
            <CountdownTimer eventDate={eventDate} label={t('events:home.countdown.label')} />
          </Group>
          <Grid gutter="xl" align="stretch">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <AddressMap
                address={eventAddress}
                mapEmbedUrl={mapEmbedUrl}
                title={t('events:home.location.title')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ImportantPerson
                photo={keynote.photo}
                name={keynote.name}
                title={keynote.title}
                bio={keynote.bio}
              />
            </Grid.Col>
          </Grid>
          <Box>
            <OrganizerInfo
              logo={organizer.logo}
              name={organizer.name}
              description={organizer.description}
              website={organizer.website}
              socials={organizer.socials}
            />
          </Box>
          <Box id="apply">
            <ApplyForm
              initialValues={{
                fullName: '',
                email: '',
                phone: '',
                company: '',
                position: '',
                message: '',
              }}
              onSubmit={(values) => {
                // Mock submit handler
                alert('Application submitted! ' + JSON.stringify(values, null, 2));
              }}
            />
          </Box>
        </Stack>
      </Container>
      <Footer
        copyright="© 2025 Future Leaders Summit"
        links={footerLinks}
        extraInfo={
          <span>Astana International Expo Center, Qabanbay Batyr Ave 53, Astana, Kazakhstan</span>
        }
      />
    </FullscreenBackground>
  );
}
