import AutoComplete from '@/components/shared/form/AutoComplete';
import TextInputField from '@/components/shared/form/TextInputField';
import { Button } from '@/components/ui/button';
import { CreateDocument } from '@/lib/api/mutations.global';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { toast } from 'sonner';

const AddAssetCategory = ({ onClose }: { onClose: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-asset-category'],
    mutationFn: CreateDocument,
    onSuccess: () => {
      toast.success('Asset Category created succesfully');
    },
    onSettled: () => {
      onClose();
    },
  });

  const { ...form } = useFormik({
    initialValues: {
      asset_category_name: '',
      account: '',
    },
    onSubmit: (value) => {
      mutate({
        url: '/accounting/create/asset-category',
        payload: {
          asset_category_name: value.asset_category_name,
          accounts: [
            {
              fixed_asset_account: value.account,
            },
          ],
        },
      });
    },
  });

  const fields = [
    {
      id: 'asset_category_name',
      type: 'text',
      label: 'Category Name',
      placeholder: 'e.g Electronics',
    },
    {
      id: 'account',
      type: 'auto_complete',
      label: 'Fixed Asset Account',
      placeholder: 'e.g. Building CF',
      doctype: 'Account',
      reference_doctype: 'Asset Catergory',
      filters: {
        account_type: 'Fixed Asset',
        root_type: 'Asset',
        is_group: 0,
        company: 'CCT FUND-',
      },
    },
  ];
  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  return (
    <div className="pb-6">
      <div className="grid grid-cols-1 gap-3">
        {fields?.map((field) => {
          switch (field.type) {
            case 'text':
              return (
                <TextInputField
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  {...form}
                  extraClassName="w-full"
                />
              );

            case 'auto_complete':
              return (
                <AutoComplete
                  filters={field?.filters}
                  doctype={field.doctype}
                  reference_doctype={field.reference_doctype}
                  onChange={(value) => {
                    handleSelectChange(field.id, value);
                  }}
                  {...field}
                  {...form}
                  key={field.id}
                  extraClassName="text-[0.7rem] font-medium"
                />
              );
          }
        })}
      </div>
      <div className=" grid grid-cols-2 gap-3 col-span-2 mt-5">
        <Button
          className="bg-white border-[0.85px] hover:bg-primary-green/5 border-primary-green text-primary-green"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}>
          Cancel
        </Button>
        <Button
          // disabled={isPending}
          className="bg-primary-green text-black hover:bg-primary-green/hover"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          {isPending ? <Icon icon={'eos-icons:loading'} /> : 'Create Category'}
        </Button>
      </div>
    </div>
  );
};

export default AddAssetCategory;
