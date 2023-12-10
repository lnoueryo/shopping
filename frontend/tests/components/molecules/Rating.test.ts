import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Rating from '/components/molecules/Rating.vue';

describe('Rating', () => {
  describe('Display Rating', () => {
    it('Render Correctly', () => {
      const incompleteRating = {};
      const wrapper = createRating(incompleteRating);
      expect(wrapper.vm.rate).toBe(wrapper.vm.MIN_RATING);
      expect(wrapper.find('.rate-form').exists()).toBe(true);
      expect(wrapper.findAll('input[type="radio"]').length).toBe(
        wrapper.vm.MAX_RATING
      );
      expect(wrapper.findAll('label').length).toBe(wrapper.vm.MAX_RATING);
    });

    it('Verify Default Rate', () => {
      const incompleteRating = {};
      const wrapper = createRating(incompleteRating);
      const rateValue = wrapper.vm.rate;
      expect(rateValue).toBe(wrapper.vm.MIN_RATING);
      const ratingInputs = wrapper.findAll('input[type="radio"]');
      expect(ratingInputs.length).toBe(wrapper.vm.MAX_RATING);
      for (const inputWrapper of ratingInputs) {
        expect((inputWrapper.element as HTMLInputElement).checked).toBe(false);
      }
    });
  });

  describe('Props Validation', () => {
    it('Verify Valid v-model Prop Value', () => {
      const validRatings = [{ modelValue: 0 }, { modelValue: 5 }];
      const invalidRatings = [{ modelValue: -1 }, { modelValue: 6 }];
      for (const rating of validRatings) {
        const wrapper = createRating(rating);
        expect(wrapper.vm.rate).toBe(Math.floor(rating.modelValue));
      }
      for (const rating of invalidRatings) {
        const wrapper = createRating(rating);
        expect(wrapper.vm.rate).toBe(wrapper.vm.MIN_RATING);
      }
    });

    it('Verify Invalid v-model Prop Value', () => {
      const lastStarOnlyAndFiveRating = {
        modelValue: 5,
        lastStarOnly: true,
      };
      const wrapper = createRating(lastStarOnlyAndFiveRating);
      expect(wrapper.vm.rate).toBe(wrapper.vm.MIN_RATING);
    });

    it('Verify Rate Reflects Initial Prop Value When Value Is 5 And Last Only Star Is True', () => {
      const lastStarOnlyAndFiveRating = {
        modelValue: 5,
        lastStarOnly: true,
      };
      const wrapper = createRating(lastStarOnlyAndFiveRating);
      expect(wrapper.vm.rate).toBe(wrapper.vm.MIN_RATING);
    });
  });

  describe('Behavior', () => {
    const rating = {
      modelValue: 4,
    };

    it('Verify Read-Only', async () => {
      const wrapper = createRating(rating);
      const ratingInputs = wrapper.findAll('input[type="radio"]');
      const ratingFirstInput = ratingInputs[4];
      await ratingFirstInput.trigger('click');
      expect(wrapper.vm.rate).toBe(
        Number(ratingFirstInput.wrapperElement.value)
      );
      await wrapper.setProps({ readOnly: true });
      for (const inputWrapper of ratingInputs) {
        await inputWrapper.trigger('click');
      }
      expect(wrapper.vm.rate).toBe(
        Math.round(Number(ratingFirstInput.wrapperElement.value))
      );
    });

    it('Verify Last Star Only', async () => {
      const lastStarOnlyRating = { ...rating, lastStarOnly: true };
      const wrapper = createRating(lastStarOnlyRating);
      const ratingInputs = wrapper.findAll('input[type="radio"]');
      const ratingFirstInput = ratingInputs[4];
      const ratingLastInput = ratingInputs[0];
      expect(wrapper.vm.rate).toBe(Math.round(rating.modelValue));
      await ratingFirstInput.trigger('click');
      expect(wrapper.vm.rate).toBe(
        Number(ratingFirstInput.wrapperElement.value)
      );
      await ratingLastInput.trigger('click');
      expect(wrapper.vm.rate).toBe(
        Math.round(Number(ratingFirstInput.wrapperElement.value))
      );
    });

    it('Verify Reset Rating', async () => {
      const wrapper = createRating(rating);
      const ratingInputs = wrapper.findAll('input[type="radio"]');
      const ratingForthInput = ratingInputs[1];
      expect(wrapper.vm.rate).toBe(Math.round(rating.modelValue));
      await ratingForthInput.trigger('click');
      expect(wrapper.vm.rate).toBe(0);
      await ratingForthInput.trigger('click');
      expect(wrapper.vm.rate).toBe(Math.round(rating.modelValue));
    });

    it('Verify v-model', async () => {
      const wrapper = createRating(rating);
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        rating.modelValue,
      ]);

      const ratingInputs = wrapper.findAll('input[type="radio"]');
      const ratingLastInput = ratingInputs[0];
      await ratingLastInput.trigger('click');

      expect(
        wrapper.emitted()['update:modelValue'][
          wrapper.emitted()['update:modelValue'].length - 1
        ]
      ).toEqual([Number(ratingLastInput.wrapperElement.value)]);
    });
  });
});

interface RatingData {
  modelValue?: number;
  size?: number;
  readOnly?: boolean;
  lastStarOnly?: boolean;
}

const createRating = (ratingData: RatingData) => {
  return mount(Rating, {
    props: ratingData,
  });
};
