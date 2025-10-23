# Husky + Test Coverage Implementation Guide

## Overview
This guide demonstrates how to set up Husky as a quality gatekeeper for your project, preventing commits that don't meet your code quality standards.

## What We Built
- ✅ **CopyButton component** with clipboard functionality
- ✅ **100% statement coverage** on the component
- ✅ **Husky pre-commit hook** that enforces quality
- ✅ **Coverage thresholds** that prevent low-quality commits

## Step 1: Install Husky

```bash
# Install as dev dependency
npm install --save-dev husky

# Initialize git hooks
npx husky init
```

This creates:
- `.husky/` directory
- `.husky/pre-commit` file
- Automatically configures git to use these hooks

## Step 2: Create Pre-commit Hook

Update `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test -- --coverage
```

This runs tests with coverage before every commit.

## Step 3: Configure Coverage Thresholds

Update `jest.config.ts`:
```typescript
const config: Config = {
  // ... existing config ...

  // Coverage thresholds - fail if coverage falls below these values
  coverageThreshold: {
    global: {
      branches: 80,    // 80% branch coverage
      functions: 80,    // 80% function coverage
      lines: 80,        // 80% line coverage
      statements: 80,   // 80% statement coverage
    }
  },

  // ... rest of config ...
};
```

## Step 4: Test Coverage Strategy

### Our CopyButton Component
```tsx
export default function CopyButton({ textToCopy, className = '' }: CopyButtonProps) {
  const [buttonText, setButtonText] = useState<'Copy' | 'Copied!' | 'Error'>('Copy');
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (isLoading) return; // Early return if loading

    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(textToCopy);
      setButtonText('Copied!');

      setTimeout(() => {
        setButtonText('Copy');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setButtonText('Error');
      setIsLoading(false);

      setTimeout(() => {
        setButtonText('Copy');
      }, 2000);
    }
  };

  return (
    <button onClick={handleCopy} disabled={isLoading}>
      {buttonText}
    </button>
  );
}
```

### Comprehensive Test Coverage
```tsx
describe('CopyButton', () => {
  // ✅ Initial render test
  it('renders with default Copy text', () => {
    render(<CopyButton textToCopy="Hello World" />);
    expect(screen.getByTestId('copy-button')).toHaveTextContent('Copy');
  });

  // ✅ Success path test
  it('copies text and shows success state', async () => {
    mockWriteText.mockResolvedValue(undefined);

    render(<CopyButton textToCopy="Hello World" />);
    fireEvent.click(screen.getByTestId('copy-button'));

    await waitFor(() => {
      expect(screen.getByTestId('copy-button')).toHaveTextContent('Copied!');
    });
  });

  // ✅ Error handling test
  it('handles clipboard API errors', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard access denied'));

    render(<CopyButton textToCopy="Hello World" />);
    fireEvent.click(screen.getByTestId('copy-button'));

    await waitFor(() => {
      expect(screen.getByTestId('copy-button')).toHaveTextContent('Error');
    });
  });

  // ✅ Edge case test
  it('prevents multiple clicks while loading', async () => {
    const neverResolve = new Promise(() => {});
    mockWriteText.mockReturnValue(neverResolve);

    render(<CopyButton textToCopy="Hello World" />);
    fireEvent.click(screen.getByTestId('copy-button')); // First click
    fireEvent.click(screen.getByTestId('copy-button')); // Second click

    expect(mockWriteText).toHaveBeenCalledTimes(1); // Only called once
  });
});
```

## Step 5: How Husky Works

### Commit Flow
1. `git add .` - Stage changes
2. `git commit -m "message"` - Attempt commit
3. **Husky intercepts** - Runs `.husky/pre-commit` script
4. **Tests run** - `npm test -- --coverage` executes
5. **Coverage check** - Jest compares against thresholds
6. **Decision**:
   - ✅ **Pass** - Commit proceeds
   - ❌ **Fail** - Commit blocked with error message

### Example Output

**Success (Commit allowed):**
```
PASS src/components/__tests__/CopyButton.test.tsx
✓ 100% coverage on CopyButton.tsx
✓ All coverage thresholds met

[main abc1234] feat: add CopyButton component
 2 files changed, 50 insertions(+)
```

**Failure (Commit blocked):**
```
FAIL src/components/__tests__/SomeComponent.test.tsx
✗ Coverage below thresholds
  Statements: 65% < 80%
  Branches: 50% < 80%

Husky - pre-commit hook failed
```

## Step 6: Best Practices

### Coverage Threshold Levels

**Strict (90%+):**
```typescript
coverageThreshold: {
  global: { branches: 90, functions: 90, lines: 90, statements: 90 }
}
```
- Use for production codebases
- High quality standards
- Prevents most bugs from reaching production

**Moderate (80%+):**
```typescript
coverageThreshold: {
  global: { branches: 80, functions: 80, lines: 80, statements: 80 }
}
```
- Good balance of quality and development speed
- Industry standard
- Our current configuration

**Per-file Custom:**
```typescript
coverageThreshold: {
  global: { branches: 70, functions: 70, lines: 70, statements: 70 },
  './src/components/CopyButton.tsx': {
    branches: 100, functions: 100, lines: 100, statements: 100
  }
}
```
- High standards for critical components
- Reasonable standards for existing code
- Gradual quality improvement

### Testing Tips

1. **Mock external APIs**: Use `jest.mock()` for browser APIs
2. **Test all states**: Success, error, loading, empty
3. **Use React Testing Library**: `userEvent` > `fireEvent` for realistic interactions
4. **Cover edge cases**: Early returns, error handling, concurrent operations
5. **Achieve 100% coverage**: Test every branch, statement, and function

### Husky Tips

1. **Keep hooks fast**: Only test relevant files, not entire suite
2. **Use lint-staged**: Combine with `lint-staged` for better performance
3. **Clear error messages**: Helpful messages guide developers to fix issues
4. **Configure gradually**: Start with lower thresholds, increase over time

## Results Achieved

### Coverage Metrics
```
File             | % Stmts | % Branch | % Funcs | % Lines
-----------------|---------|----------|---------|---------
CopyButton.tsx   |     100 |    83.33 |     100 |     100
All files        |    83.9 |    92.59 |    90.9 |    83.9
```

### Quality Gates Working
- ✅ **Prevents low-quality commits**
- ✅ **Enforces testing standards**
- ✅ **Provides immediate feedback**
- ✅ **Maintains code quality over time**

## Final Workflow

```bash
# 1. Make changes to code
git add .

# 2. Attempt commit (Husky runs automatically)
git commit -m "feat: add new feature"

# 3. If tests pass → commit succeeds
# 4. If tests fail → fix issues, then retry commit
```

## Troubleshooting

### Hook Not Running
```bash
# Check if file is executable
ls -la .husky/pre-commit
# Should show: -rwxr-xr-x

# Make executable if needed
chmod +x .husky/pre-commit
```

### Coverage Not Calculating
```bash
# Ensure Jest collects coverage
npm test -- --coverage

# Check Jest config for collectCoverage: true
```

### Thresholds Too Strict
Start with lower thresholds (70%), then gradually increase as team adapts to testing requirements.

---

**Summary**: Husky + coverage thresholds provide automated quality gates that prevent bad code from entering your codebase while maintaining developer productivity.
