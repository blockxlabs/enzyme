class EnzymeValidator {
  constructor(validations) {
    this.validations = validations;
  }

  validate(state) {
    const validation = this.valid();
    this.validations.forEach(rule => {
      if (!validation[rule.field].isInvalid) {
        const fieldValue = state[rule.field].toString();
        const args = rule.args || [];
        const validatorMethod = rule.method;

        if (validatorMethod(fieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }

        const otherProperties = this.extractOtherRules(rule);
        validation[rule.field] = {
          ...validation[rule.field],
          ...otherProperties,
        };
      }
    });
    return validation;
  }

  valid() {
    const validation = {};

    this.validations.forEach(rule => {
      const otherProperties = this.extractOtherRules(rule);

      validation[rule.field] = {
        isInvalid: false,
        message: '',
        ...otherProperties,
      };
    });

    return { isValid: true, ...validation };
  }

  extractOtherRules(rule) {
    const {
      isInvalid, message, method, validWhen, field, ...otherRules
    } = rule;
    const otherProperties = {
      ...otherRules,
    };

    return otherProperties;
  }
}
export default EnzymeValidator;
