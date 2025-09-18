import { Preferences } from '@capacitor/preferences';

const setValue = async (key, value) => {
  await Preferences.set({
    key: key,
    value: value,
  });
};

const getValue = async (key) => {
  const { value } = await Preferences.get({
    key: key,
  });
  return value;
};

const removeValue = async (key) => {
  await Preferences.remove({ key: key });
};

export { setValue, getValue, removeValue };
