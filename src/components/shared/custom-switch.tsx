import { cn, Switch, SwitchProps } from '@nextui-org/react';

const CustomSwitch = (props: SwitchProps) => {
  return (
    <Switch
      classNames={{ wrapper: cn('group-data-[selected]:bg-primary-green') }}
      {...props}
    />
  );
};

export default CustomSwitch;
