import { Box, Container, Title, Text, Button, Group } from '@mantine/core';
import type { PageBlock } from '@/generated/types';

interface HeroBlockProps {
  block: PageBlock;
}

export function HeroBlock({ block }: HeroBlockProps) {
  const settings = block.settings as any;
  
  return (
    <Box
      style={{
        background: settings?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: settings?.padding || '80px 20px',
        textAlign: settings?.textAlign || 'center',
        color: settings?.color || '#ffffff',
        minHeight: settings?.minHeight || '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="lg">
        <div dangerouslySetInnerHTML={{ __html: block.richText }} />
        {settings?.ctaButtons && (
          <Group justify="center" mt="xl">
            {settings.ctaButtons.map((button: any, index: number) => (
              <Button
                key={index}
                size="lg"
                variant={button.variant || 'filled'}
                color={button.color || 'white'}
                component="a"
                href={button.url}
                target={button.external ? '_blank' : undefined}
              >
                {button.text}
              </Button>
            ))}
          </Group>
        )}
      </Container>
    </Box>
  );
} 