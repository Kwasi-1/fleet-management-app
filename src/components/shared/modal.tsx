import { cn } from '@/lib/utils';
import {
  extendVariants,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FC } from 'react';

interface CustomModalProps {
  onClose?: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  size?:
    | 'sm'
    | 'lg'
    | 'md'
    | 'xs'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full';
  radius?: 'sm' | 'lg' | 'md' | 'none';
  scrollBehavior?: 'outside' | 'inside' | 'normal';
  placement?:
    | 'auto'
    | 'center'
    | 'top'
    | 'right'
    | 'top-center'
    | 'bottom'
    | 'bottom-center';
  isDismissable?: boolean;
  classNames?: Partial<{
    header: any;
    body: any;
    footer: any;
    wrapper: any;
    base: any;
    backdrop: any;
    closeButton: any;
  }>;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  header,
  body,
  footer,
  size,
  scrollBehavior,
  placement = 'center',
  radius = 'md',
  isDismissable = true,
  classNames = {}
}) => {
  return (
    <NewModal
      size={size ? size : 'lg'}
      backdrop="opaque"
      isOpen={isOpen}
      isDismissable={isDismissable}
      onOpenChange={onOpenChange}
      scrollBehavior={scrollBehavior}
      placement={placement}
      radius={radius}
      classNames={{
        body: cn('py-0 dark:text-[#F5F5F5]', classNames.body),
        base: cn(
          'border-[#161616] dark:bg-[#161616] dark:text-[#a8b0d3]',
          classNames.base
        ),
        header: cn('dark:text-[#F5F5F5]', classNames.header),
        closeButton: cn(
          'dark:hover:bg-white/5 active:bg-white/10 text-[18px]',
          classNames.closeButton
        ),
      }}
      motionProps={{
        variants: {
          enter: {
            ...(placement === 'right' ? { x: 0 } : { y: 0 }),
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            ...(placement === 'right' ? { x: 80 } : { y: -20 }),
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}>
      <ModalContent className="">
        <>
          <ModalHeader className="flex flex-col gap-1 ">{header}</ModalHeader>
          <ModalBody className="">{body}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </>
      </ModalContent>
    </NewModal>
  );
};

export default CustomModal;

const NewModal = extendVariants(Modal, {
  variants: {
    placement: {
      right: {
        wrapper: 'justify-end items-stretch sm:items-stretch',
        base: 'mx-0 sm:mx-0 my-0 sm:my-0 h-full max-h-screen overflow-y-auto scrollbar-hide min-w-[500px]',
      },
    },
  },
});
