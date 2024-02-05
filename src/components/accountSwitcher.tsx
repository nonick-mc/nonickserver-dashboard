import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';

export function AccountSwitcher({
  isOpen,
  onOpenChange,
}: { isOpen: boolean; onOpenChange: () => void }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>アカウント切り替え</ModalHeader>
      </ModalContent>
    </Modal>
  );
}
