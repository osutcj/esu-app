import { createAction, createReducer } from '@reduxjs/toolkit';

// Type for this reducer
export interface ExampleState {
  value?: number;
}

// Object that represents the state of this missing resource
const missingExample: ExampleState = { value: undefined };

// Get the object from local storage (optional, just as a demonstration), usable for initial state
const getLocalStoreExample = (): ExampleState => {
  const rawExample = window.localStorage.getItem('example');

  if (!rawExample) return missingExample;

  try {
    return JSON.parse(rawExample) as ExampleState;
  } catch (e) {
    console.error(e);
    return missingExample;
  }
};

// Other local store example
export const persistExampleState = (example: ExampleState) => {
  window.localStorage.setItem('example', JSON.stringify(example));
};

// Other local store example
export const removeExampleState = () => {
  window.localStorage.removeItem('example');
};

// Action implementation
export const newExampleFromValue = (value: number | null | undefined): ExampleState => {
  if (!value) return missingExample;
  return { value };
};

// Action definition
export const incrementExampleValue = createAction<number | null | undefined, 'example/increment'>('example/increment');
export const changeExampleFromValue = createAction<number | null | undefined, 'example/fromValue'>('example/fromValue');
export const deleteExampleState = createAction<void, 'example/delete'>('example/delete');

// Create action defined in 'Action definition' and use the 'Implementation' to fulfill the mutation
// If no local storage is used, this is usually similar to 'missingExample'
const initExample = getLocalStoreExample();
export default createReducer(initExample, (builder) =>
  builder
    .addCase(incrementExampleValue, (state, action) => {
      const increment = Number(action.payload) || 1;
      const newState = { value: (state.value ?? 0) + increment };
      persistExampleState(newState);

      state.value = newState.value;
    })
    .addCase(changeExampleFromValue, (state, action) => {
      console.log('changeExampleFromValue', state, action);

      const newState = newExampleFromValue(action.payload);
      persistExampleState(newState);
      state.value = newState.value;
    })
    .addCase(deleteExampleState, (state) => {
      removeExampleState();
      state.value = missingExample.value;
    }),
);
