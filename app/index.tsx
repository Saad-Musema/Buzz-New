import {Redirect, useRootNavigationState} from 'expo-router';

const Index = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={"/gab"} />;
};

export default Index;
