package com.mestrep.bh.handler;

import com.mestrep.bh.error.ObjectNotFoundExecption;
import com.mestrep.bh.error.ObjectNotFoundExecptionDetails;
import com.mestrep.bh.error.UsuarioExecption;
import com.mestrep.bh.error.UsuarioExecptionDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestHandlerExecption extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UsuarioExecption.class)
    public ResponseEntity handleQrcodeExecption(UsuarioExecption usuarioExecption) {
        UsuarioExecptionDetails usuarioExecptionDetails = new UsuarioExecptionDetails();
        usuarioExecptionDetails.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        usuarioExecptionDetails.setTitle("Erro com usuario");
        usuarioExecptionDetails.setMessage(usuarioExecption.getMessage());
        usuarioExecptionDetails.setDetails(usuarioExecption.getClass().getName());
        return new ResponseEntity(usuarioExecptionDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ObjectNotFoundExecption.class)
    public ResponseEntity handleQrcodeExecption(ObjectNotFoundExecption objectNotFoundExecption) {
        ObjectNotFoundExecptionDetails objectNotFoundExecptionDetails = new ObjectNotFoundExecptionDetails();
        objectNotFoundExecptionDetails.setStatus(HttpStatus.NOT_FOUND.value());
        objectNotFoundExecptionDetails.setTitle("Não encontrado");
        objectNotFoundExecptionDetails.setMessage(objectNotFoundExecption.getMessage());
        objectNotFoundExecptionDetails.setDetails(objectNotFoundExecption.getClass().getName());
        return new ResponseEntity(objectNotFoundExecptionDetails, HttpStatus.NOT_FOUND);
    }
}
