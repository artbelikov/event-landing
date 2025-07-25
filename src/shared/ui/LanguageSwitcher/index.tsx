import { IconChevronDown, IconLanguage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button, Group, Menu, Text } from '@mantine/core';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          leftSection={<IconLanguage size={16} />}
          rightSection={<IconChevronDown size={16} />}
          size="sm"
        >
          {currentLanguage.nativeName}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select Language</Menu.Label>
        {languages.map((language) => (
          <Menu.Item
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            c={language.code === i18n.language ? 'blue' : undefined}
            fw={language.code === i18n.language ? 600 : 400}
          >
            <Group>
              <Text size="sm">{language.nativeName}</Text>
              <Text size="xs" c="dimmed">
                {language.name}
              </Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
