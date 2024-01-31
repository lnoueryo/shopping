export const genreClass = [
  `
    <div style="color: var(--color-tag-name);">class&nbsp;</div>
    <div style="color: var(--color-class-name);">Genre&nbsp;</div>
    <div style="color: var(--color-parentheses);">&#123;&nbsp;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag-name);">private&nbsp;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag-name);">constructor</div>
    <div style="color: var(--color-import);">&#40;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-import);">&#41;&nbsp;</div>
    <div style="color: var(--color-import);">&#123;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag-name);">this</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">genre&nbsp;</div>
    <div style="color: var(--color-equal);">&#61;&nbsp;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">&#125;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag-name-method);">goToPage</div>
    <div style="color: var(--color-import);">&#40;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-name);">string</div>
    <div style="color: var(--color-import);">&#41;&nbsp;</div>
    <div style="color: var(--color-import);">&#123;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">return&nbsp;</div>
    <div style="color: var(--color-define);">window</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">location</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">href&nbsp;</div>
    <div style="color: var(--color-equal);">&#61;&nbsp;</div>
    <div style="color: var(--color-string);">&#096;</div>
    <div style="color: var(--color-string);">&#047;</div>
    <div style="color: var(--color-tag-name);">&#036;</div>
    <div style="color: var(--color-tag-name);">&#123;&nbsp;</div>
    <div style="color: var(--color-tag-name);">this</div>
    <div style="color: var(--color-equal);">&#46;</div>
    <div style="color: var(--color-define);">genre</div>
    <div style="color: var(--color-tag-name);">&#125;</div>
    <div style="color: var(--color-string);">&#096;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-import);">&#125;</div>
  `,
  `
    <div style="color: var(--color-parentheses);">&#125;</div>
  `,
];

export const selectGenreFunc = [
  `
    <div style="color: var(--color-class);">interface&nbsp;</div>
    <div style="color: var(--color-class-name);">Genre&nbsp;</div>
    <div style="color: var(--color-parentheses);">&#123;&nbsp;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">id</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-key);">number</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">title</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-key);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">to</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-key);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="">&nbsp;&nbsp;</div>
    <div style="color: var(--color-primary);">icon</div>
    <div style="color: var(--color-equal);">&#58;&nbsp;</div>
    <div style="color: var(--color-class-key);">string</div>
    <div style="color: var(--color-equal);">&#59;</div>
  `,
  `
    <div style="color: var(--color-parentheses);">&#125;</div>
  `,
];

export const genreSelectorHTML = [
  `
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-component-element);">NuxtLink&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-tag-property);">to</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-equal);">&#34;</div>
    <div style="color: var(--color-primary);">to</div>
    <div style="color: var(--color-equal);">&#34;&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-tag-property);">key</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-equal);">&#34;</div>
    <div style="color: var(--color-primary);">id</div>
    <div style="color: var(--color-equal);">&#34;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag-name);">div&nbsp;</div>
    <div style="color: var(--color-tag-property);">class</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-tag-property-value);">&#34;genre-content&#34;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-component-element);">SvgIcon&nbsp;</div>
    <div style="color: var(--color-equal);">&#58;</div>
    <div style="color: var(--color-tag-property);">path</div>
    <div style="color: var(--color-equal);">&#61;</div>
    <div style="color: var(--color-equal);">&#34;</div>
    <div style="color: var(--color-primary);">icon</div>
    <div style="color: var(--color-equal);">&#34;&nbsp;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag-name);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
    <div style="color: var(--color-parentheses);">{{&nbsp;</div>
    <div style="color: var(--color-primary);">title&nbsp;</div>
    <div style="color: var(--color-parentheses);">}} </div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-tag-name);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&nbsp;&nbsp;</div>
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-tag-name);">div</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
  `
    <div style="color: var(--color-tag);">&#60;</div>
    <div style="color: var(--color-tag);">&#47;</div>
    <div style="color: var(--color-component-element);">NuxtLink</div>
    <div style="color: var(--color-tag);">&#62;</div>
  `,
];
