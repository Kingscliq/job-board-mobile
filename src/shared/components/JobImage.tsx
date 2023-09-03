import { View, Text, Image, StyleProp, ImageStyle } from 'react-native';
import React, { useState } from 'react';
import images from '../constants/images';

interface IJobImage {
  src: string;
  styles: StyleProp<ImageStyle>;
}
const JobImage: React.FC<IJobImage> = ({ src, styles }) => {
  const [url, setUrl] = useState(images.job);
  return (
    <Image
      source={src !== null ? { uri: `${src}` } : url}
      alt="Company Logo"
      resizeMode="contain"
      style={styles}
      onError={() => setUrl(images.job)}
    />
  );
};

export default JobImage;
