import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-border p-8 shadow-sm">
            <h1 className="text-lg font-semibold mb-2">發生錯誤</h1>
            <p className="text-sm text-muted-foreground mb-4">應用程式載入時發生未預期的問題。請重新整理頁面，若持續發生請檢查瀏覽器主控台。</p>
            {this.state.message && (
              <pre className="text-xs bg-muted rounded-lg p-3 overflow-x-auto mb-4 border border-border">{this.state.message}</pre>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand to-brand-deep text-white font-medium hover:from-brand-deep hover:to-brand-strong"
            >
              重新整理
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
