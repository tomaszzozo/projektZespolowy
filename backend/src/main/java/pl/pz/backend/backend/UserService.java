package pl.pz.backend.backend;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
class UserService {
    private final UserRepository userRepository;

    User getUser(int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserDoesNotExistsException("User with given id %d does not exists".formatted(id)));
    }

    void putUser(User.Dto dto) {
        var user = userRepository.findById(dto.id()).orElseThrow(() -> new UserDoesNotExistsException("User with given id %d does not exists".formatted(dto.id())));
        user.setEmail(dto.email());
        user.setRole(dto.role());
        user.setFirst_name(dto.first_name());
        user.setLast_name(dto.last_name());
        user.setPhone_number(dto.phone_number());
        userRepository.save(user);
    }
}
