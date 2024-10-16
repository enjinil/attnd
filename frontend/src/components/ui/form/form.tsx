const Form = ({ onSubmit, initialValues, children }) => {
  return (
    <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
      <form className="space-y-4" onSubmit={useFormContext().handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export {Form}