import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStyles} from '../Context/Contexts/StyleContext';
import {useFormikContext} from 'formik';
import {PostContentData} from '../../libraries/Structs/ControllerStructs';
import {AppImageViewer} from '../Images/AppImageViewer';
import {ImageQueryData} from '../../libraries/Types';
import {ContentPostAttachmentImage} from '../Images/ContentPostAttachmentImage';
import {ContentPostAttachedImage} from '../Images/ContentPostAttachedImage';

export const ContentInsertPhotosView = () => {
  const {commonStyles} = useStyles();
  const {values, setFieldValue, isSubmitting} = useFormikContext<PostContentData>();
  const [viewerImages, setViewerImages] = useState<ImageQueryData[]>([]);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const styles = StyleSheet.create({
    imageRow: {
      ...commonStyles.flexRow,
      ...commonStyles.marginTopSmall,
    },
  });

  useEffect(() => {
    setViewerImages(
      values.images.map(img => {
        return {
          mimeType: 'image',
          dataURI: `data:image;base64,${img.image}`,
          fileName: 'New Image',
        };
      }),
    );
  }, [values.images]);

  if (values.images.length === 0) {
    return null;
  }

  return (
    <View style={styles.imageRow}>
      <AppImageViewer
        viewerImages={viewerImages}
        isVisible={isViewerVisible}
        setIsVisible={setIsViewerVisible}
        enableDownload={false}
        initialIndex={viewerIndex}
      />
      {values.images.map((imageData, index) => {
        return (
          <ContentPostAttachedImage
            key={index}
            onIconPress={() => {
              setFieldValue(
                'images',
                values.images.filter((img, idx) => idx !== index),
              );
              setViewerIndex(0);
            }}
            onImagePress={() => {
              setViewerIndex(index);
              setIsViewerVisible(true);
            }}
            disabled={isSubmitting}
            imageData={imageData}
          />
        );
      })}
    </View>
  );
};
