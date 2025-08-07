import { Box, Container, Grid } from '@mantine/core';
import { AdminLayout } from '@/shared/ui/AdminLayout';
import { DashboardQuickActions, DashboardStats } from '@/widgets';
import { RecentConferences } from '@/widgets/admin';

export function DashboardPage() {
  return (
    <AdminLayout title="Admin Dashboard">
      <Container size="xl" p="md">
        <Box mb="xl">
          <DashboardStats />
        </Box>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <RecentConferences />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <DashboardQuickActions />
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
}
