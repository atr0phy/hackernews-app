import React from 'react';
import { Story } from '../components/Story';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../services/hnApi', () => ({
  getStory: jest.fn(),
}));

test('renders the styory componnent with content', async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  const { getByText, getByTestId } = render(<Story storyId='1' />);
  await waitForElement(() => [
    expect(getByTestId('story')).toBeTruthy(),
    expect(getByText('Tarnished: Google responds')).toBeTruthy(),
    expect(getByTestId('story-by').textContent).toEqual('By: Atr0phy'),
  ]);
});
