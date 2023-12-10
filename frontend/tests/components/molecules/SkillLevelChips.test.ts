import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkillLevelChip from '/components/atoms/SkillLevelChip.vue';
import SkillLevelChips from '/components/molecules/SkillLevelChips.vue';

describe('SkillLevelChips', () => {
  describe('Display SkillLevelChips', () => {
    const skillLevelChips = {
      modelValue: ['beginner', 'advanced'],
    };
    it('Render Correctly', () => {
      const wrapper = createSkillLevelChips(skillLevelChips);
      const skillLevelComponents = wrapper.findAllComponents(SkillLevelChip);
      for (const skillLevelComponent of skillLevelComponents) {
        if (
          skillLevelChips.modelValue.includes(skillLevelComponent.props().title)
        ) {
          expect(skillLevelComponent.vm.isSelected).toBeTruthy();
        } else {
          expect(skillLevelComponent.vm.isSelected).toBeFalsy();
        }
      }
    });
  });

  describe('Behavior', () => {
    const skillLevelChips = {
      modelValue: ['beginner', 'advanced'],
    };

    it('Verify v-model', async () => {
      const wrapper = createSkillLevelChips(skillLevelChips);
      const skillLevelComponents = wrapper.findAllComponents(SkillLevelChip);
      let emitIndex = 0;
      for (const skillLevelComponent of skillLevelComponents) {
        if (!skillLevelComponent.vm.isSelected) {
          const input = skillLevelComponent.find('input');
          expect(input.exists()).toBeTruthy();
          await input.trigger('click');
          await input.trigger('change');
          expect(wrapper.emitted('update:modelValue')).toBeTruthy(); //
          expect(wrapper.emitted()['update:modelValue'][emitIndex]).toEqual([
            wrapper.vm.selectedSkillLevels,
          ]);
          emitIndex += 1;
        }
        expect(skillLevelComponent.vm.isSelected).toBeTruthy();
      }
      for (const skillLevelComponent of skillLevelComponents) {
        const input = skillLevelComponent.find('input');
        expect(input.exists()).toBeTruthy();
        await input.trigger('click');
        await input.trigger('change');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy(); //
        expect(wrapper.emitted()['update:modelValue'][emitIndex]).toEqual([
          wrapper.vm.selectedSkillLevels,
        ]);
        emitIndex += 1;
        expect(skillLevelComponent.vm.isSelected).toBeFalsy();
      }
    });
  });
});

interface SkillLevelChipsData {
  modelValue?: string[]
}

const createSkillLevelChips = (skillLevelChipsData: SkillLevelChipsData) => {
  return mount(SkillLevelChips, {
    props: skillLevelChipsData,
  });
};
