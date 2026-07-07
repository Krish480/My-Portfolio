import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical rendering error intercepted by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010104] px-6 text-center select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_65%)] pointer-events-none"></div>
          <div className="space-y-6 max-w-2xl z-10">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Cosmic Horizon Encountered</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              The rendering engine experienced an unexpected singularity. Resetting the session state will restore the universe view.
            </p>
            
            {this.state.error && (
              <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-xl text-left max-w-xl mx-auto overflow-auto max-h-60 text-[10px] font-mono text-red-300 select-text">
                <div className="font-bold mb-2 border-b border-red-900/30 pb-1 text-xs">
                  {this.state.error.toString()}
                </div>
                {this.state.errorInfo && (
                  <pre className="opacity-80 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gradient-to-r from-[#22d3ee] to-[#7c3aed] text-white font-bold text-sm rounded-full shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Restart Universe
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
