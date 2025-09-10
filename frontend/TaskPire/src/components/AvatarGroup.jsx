import React from "react";

const AvatarGroup = ({ avatars,  maxVisible = 3 }) => {
  return (
      <div className="flex items-center">
          {avatars.slice(0, maxVisible).map((avatar, index) => (
              avatar && avatar !== "" ? (
                  <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index}`}
                      className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
                  />
              ) : (
                  <div
                      key={index}
                      className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 bg-slate-400 flex items-center justify-center"
                  >
                      <span className="text-xs text-white font-bold">U</span>
                  </div>
              )
          ))}
          {avatars.length > maxVisible && (
              <span className="w-9 h-9 flex items-center bg-blue-50 text-sm font-medium Create selector border-white -ml-3 ">+{avatars.length - maxVisible}</span>
          )}
      </div>
  )
};

export default AvatarGroup;