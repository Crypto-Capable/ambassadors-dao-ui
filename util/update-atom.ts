const fn = (values: string[], keys: string[], atomValue: any, setAtom: any) => {
  const timer = setTimeout(() => {
    keys.forEach((val, index) => {
      console.log(index);
    });
  });
};

export default fn;
