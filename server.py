"""
Emergency Healthcare Navigator - Local Development Server
Lightweight Python HTTP Server with proper MIME types and CORS support.
"""

import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class EmergencyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server(port=PORT):
    # Try preferred port, increment if occupied
    current_port = port
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", current_port), EmergencyHTTPRequestHandler) as httpd:
                print(f"============================================================")
                print(f"  Emergency Healthcare Navigator running at:")
                print(f"  --> http://localhost:{current_port}")
                print(f"============================================================")
                print(f"Serving files from: {DIRECTORY}")
                print("Press Ctrl+C to stop the server.")
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or getattr(e, 'winerror', 0) == 10048:
                print(f"Port {current_port} in use, trying {current_port + 1}...")
                current_port += 1
            else:
                raise e

if __name__ == "__main__":
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port_arg)
