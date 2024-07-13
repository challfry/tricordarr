import {AppView} from '../../Views/AppView.tsx';
import React, {useState} from 'react';
import {ScrollingContentView} from '../../Views/Content/ScrollingContentView.tsx';
import {PaddedContentView} from '../../Views/Content/PaddedContentView.tsx';
import {useStyles} from '../../Context/Contexts/StyleContext.ts';
import {View} from 'react-native';
import {BooleanField} from '../../Forms/Fields/BooleanField.tsx';
import {Formik} from 'formik';
import {ListSubheader} from '../../Lists/ListSubheader.tsx';
import {ListSection} from '../../Lists/ListSection.tsx';
import {useConfig} from '../../Context/Contexts/ConfigContext.ts';

export const AccessibilitySettingsScreen = () => {
  const {commonStyles} = useStyles();
  const {appConfig, updateAppConfig} = useConfig();
  const [useSystemTheme, setUseSystemTheme] = useState(appConfig.accessibility.useSystemTheme);
  const [darkMode, setDarkMode] = useState(appConfig.accessibility.darkMode);

  const toggleSystemTheme = () => {
    const newValue = !appConfig.accessibility.useSystemTheme;
    updateAppConfig({
      ...appConfig,
      accessibility: {
        ...appConfig.accessibility,
        useSystemTheme: newValue,
      },
    });
    setUseSystemTheme(newValue);
  };

  const toggleDarkMode = () => {
    const newValue = !appConfig.accessibility.darkMode;
    updateAppConfig({
      ...appConfig,
      accessibility: {
        ...appConfig.accessibility,
        darkMode: newValue,
      },
    });
    setDarkMode(newValue);
  };

  return (
    <AppView>
      <ScrollingContentView isStack={true}>
        <ListSection>
          <ListSubheader>Theme</ListSubheader>
        </ListSection>
        <PaddedContentView padSides={false}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <View>
              <BooleanField
                name={'useSystemTheme'}
                label={'Use System Theme'}
                onPress={toggleSystemTheme}
                value={useSystemTheme}
                helperText={'Match your devices color scheme automatically.'}
                style={commonStyles.paddingHorizontal}
              />
              <BooleanField
                name={'darkMode'}
                label={'Dark Mode'}
                onPress={toggleDarkMode}
                value={darkMode}
                helperText={'White or light text on black or dark background.'}
                disabled={useSystemTheme}
                style={commonStyles.paddingHorizontal}
              />
            </View>
          </Formik>
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
